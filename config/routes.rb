Rails.application.routes.draw do
  root to: 'spotlight/exhibits#index'
  mount Blacklight::Oembed::Engine, at: 'oembed'
  devise_for :users
  mount Blacklight::Engine => '/'
  concern :searchable, Blacklight::Routes::Searchable.new

  resource :catalog, only: [:index], as: 'catalog', path: '/catalog', controller: 'catalog' do
    concerns :searchable
  end

  concern :exportable, Blacklight::Routes::Exportable.new

  resources :solr_documents, only: [:show], path: '/catalog', controller: 'catalog' do
    concerns :exportable
  end

  resources :bookmarks do
    concerns :exportable

    collection do
      delete 'clear'
    end
  end

  resources :exhibits do
    resources :dlme_jsons
    resource :s3_harvester, controller: :"s3_harvester", only: [:create]
  end

  resource :transform, only: [:show, :create]

  authenticate :user, lambda { |u| Ability.new(u).can? :manage, :sidekiq } do
    require 'sidekiq/web'
    mount Sidekiq::Web => '/sidekiq'
    Sidekiq::Web.set :session_secret, Rails.application.secrets[:secret_key_base]
  end

  mount Riiif::Engine => '/images', as: 'riiif'
  mount Spotlight::Engine, at: '/'
end
