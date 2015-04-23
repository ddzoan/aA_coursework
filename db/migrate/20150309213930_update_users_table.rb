class UpdateUsersTable < ActiveRecord::Migration
  def up
    remove_column :users, :name
    remove_column :users, :email

    add_column :users, :username, :string, null: false, default: 'default'

    add_index(:users, :username, unique: true)
  end

  def down
    add_column :users, :name, :string
    add_column :users, :email, :string

    remove_column :users, :username
  end
end
