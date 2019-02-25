class CreateTransformResults < ActiveRecord::Migration[5.2]
  def change
    create_table :transform_results do |t|
      t.string :url, null:false
      t.string :data_path, null:false
      t.boolean :success, null:false
      t.integer :records, null:false
      t.timestamp :timestamp, null:false
      t.integer :duration, null:false
      t.text :error
    end
  end
end
