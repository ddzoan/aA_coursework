class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.references :user, index: true, null: false

      t.timestamps null: false
    end
    add_foreign_key :contacts, :users
    add_index :contacts, [:user_id, :email], unique: true
  end
end
