Rails.application.routes.draw do
  root to: 'spotlight/exhibits#index'
  mount Blacklight::Oembed::Engine, at: 'oembed'
  devise_for :users
  mount Blacklight::Engine => '/'

  resources :suggest, only: :index, defaults: { format: 'json' }


  concern :searchable, Blacklight::Routes::Searchable.new

  resource :catalog, only: [:index], as: 'catalog', path: '/catalog', controller: 'catalog', id: %r{.+} do
    concerns :searchable
  end

  concern :exportable, Blacklight::Routes::Exportable.new

  resources :solr_documents, only: [:show], path: '/catalog', controller: 'catalog', id: %r{.+} do
    concerns :exportable
  end

  resources :bookmarks do
    concerns :exportable

    collection do
      delete 'clear'
    end
  end

  resources :exhibits, only: [] do
    resources :dlme_jsons if Settings.feature_flags.allow_json_upload
    resource :s3_harvester, controller: :"s3_harvester", only: [:create]
    resource :s3_delete, controller: :s3_delete, only: [:new, :create]
  end

  resource :transform, only: [:show, :create]
  resource :robots, only: [:show], format: 'txt'

  resource :transform_result, only: [:create, :show]

  begin
    authenticate :user, lambda { |u| Ability.new(u).can? :manage, :sidekiq } do
      require 'sidekiq/web'
      mount Sidekiq::Web => '/sidekiq'
      Sidekiq::Web.set :session_secret, Rails.application.secrets[:secret_key_base]
    end
  rescue LoadError => e
    # If we get here, the sidekiq gem wasn't available (probably because you
    # bundle installed without the production gems). As a placeholder, we'll
    # print the original exception if you try to load the page (using a very
    # basic Rack app:)
    get '/sidekiq', to: lambda { |_| [500, {}, ['Problem loading sidekiq/web: ', e.to_s]] }
  end

  mount Riiif::Engine => '/images', as: 'riiif'
  mount Spotlight::Engine, at: '/'
end
