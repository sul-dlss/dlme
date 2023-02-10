Rails.application.routes.draw do
  scope '(:locale)', locale: Regexp.union(Spotlight::Engine.config.i18n_locales.keys.map(&:to_s)) do
    root to: 'spotlight/exhibits#index'
    devise_for :users
    mount Blacklight::Oembed::Engine, at: 'oembed'
    mount Riiif::Engine => '/images', as: 'riiif'
    resource :session_display, only: :update

    resources :suggest, only: :index, defaults: { format: 'json' }

    concern :searchable, Blacklight::Routes::Searchable.new

    resource :catalog, only: [:index], as: 'catalog', path: '/catalog', controller: 'catalog', id: %r{.+} do
      concerns :searchable
      concern :range_searchable, BlacklightRangeLimit::Routes::RangeSearchable.new
    end

    concern :exportable, Blacklight::Routes::Exportable.new

    resources :solr_documents, only: [:show], path: '/catalog', controller: 'catalog', id: %r{.+}, format: false do
      concerns :exportable
    end

    resources :bookmarks do
      concerns :exportable

      collection do
        delete 'clear'
      end
    end

    resources :exhibits, only: [], path: '/' do
      resources :dlme_jsons if Settings.feature_flags.allow_json_upload
      resource :harvests, only: [:create]
      resource :s3_delete, controller: :s3_delete, only: [:new, :create]
      resource :statistics, only: :show

      resource :dlme_bulk_actions, only: [] do
        member do
          post :delete_resources
        end
      end

      get "catalog/range_limit" => "spotlight/catalog#range_limit"
      get "home/range_limit" => "spotlight/home_pages#range_limit"
      get "catalog/:id/record_feedback" => "record_feedback#new", as: 'record_feedback', id: %r{.+}
      post "catalog/:id/record_feedback" => "record_feedback#create", id: %r{.+}
    end

    resource :transform, only: :show
    resource :robots, only: [:show], format: 'txt'

    resource :transform_result, only: [:create, :show]

    authenticate :user do
      post '/utils/cache/clear', to: ->(env) { [200, {}, [Rails.cache.clear.to_s]] }
    end

    begin
      authenticate :user, lambda { |u| Ability.new(u).can? :manage, :sidekiq } do
        require 'sidekiq/web'
        mount Sidekiq::Web => '/sidekiq'
      end
    rescue LoadError => e
      # If we get here, the sidekiq gem wasn't available (probably because you
      # bundle installed without the production gems). As a placeholder, we'll
      # print the original exception if you try to load the page (using a very
      # basic Rack app:)
      get '/sidekiq', to: lambda { |_| [500, {}, ['Problem loading sidekiq/web: ', e.to_s]] }
    end
  end

  get 'image_proxy' => 'image_proxy#access', as: 'image_proxy'

  Blacklight::Engine.routes.default_scope = { path: "(:locale)", locale: Regexp.union(Spotlight::Engine.config.i18n_locales.keys.map(&:to_s)), module: 'blacklight' }
  mount Blacklight::Engine => '/'

  Spotlight::Engine.routes.default_scope = { path: "(:locale)", locale: Regexp.union(Spotlight::Engine.config.i18n_locales.keys.map(&:to_s)), module: 'spotlight' }
  mount Spotlight::Engine, at: '/'
end
