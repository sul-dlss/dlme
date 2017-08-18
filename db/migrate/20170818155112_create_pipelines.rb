class CreatePipelines < ActiveRecord::Migration[5.1]
  def change
    create_table :pipelines do |t|
      t.string :name

      t.timestamps
    end
    add_index :pipelines, :name, unique: true
  end
end
