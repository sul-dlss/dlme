class DropHarvestedResources < ActiveRecord::Migration[5.2]
  def change
    drop_table :harvested_resources
    drop_table :harvests
    drop_table :pipelines
    drop_table :resource_contents
  end
end
