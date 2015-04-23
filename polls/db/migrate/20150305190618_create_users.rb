class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :user_name, null: false

      t.timestamps
    end

    create_table :polls do |t|
      t.string :title, null: false
      t.integer :author_id, null: false

      t.timestamps
    end

    create_table :questions do |t|
      t.string :text, null: false
      t.integer :poll_id, null: false

      t.timestamps
    end

    create_table :answer_choices do |t|
      t.string :text, null: false
      t.integer :question_id, null: false

      t.timestamps
    end

    create_table :responses do |t|
      t.integer :answer_choice_id, null: false
      t.integer :respondent_id, null: false

      t.timestamps
    end

    add_index :polls, :author_id
    add_index :questions, :poll_id, unique: true
    add_index :answer_choices, :question_id, unique: true
    add_index :responses, :respondent_id, unique: true
  end
end
