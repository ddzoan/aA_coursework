class Model
  def self.table_name
    raise "must have table name"
  end

  def self.find_by_id(id)
    find_by({'id' => id}).first
  end

  # def self.find_by(column_name, value)
  #   results = QuestionsDatabase.instance.execute(<<-SQL, value)
  #   SELECT
  #     *
  #   FROM
  #     #{table_name}
  #   WHERE
  #    #{column_name} = ?
  #   SQL
  #
  #   results.map { |result| self.new(result) }
  # end

  def self.find_by(params)
    where_condition = params.keys.join(' = ? AND ') + ' = ?'

    results = QuestionsDatabase.instance.execute(<<-SQL, *params.values)
    SELECT
      *
    FROM
      #{table_name}
    WHERE
     #{where_condition}
    SQL

    results.map { |result| self.new(result) }
  end

  def save
    instance_variables = self.instance_variables
    instance_variables.delete(:@id)

    ivar_map = instance_variables.map { |i| i.to_s[1..-1] }

    variable_values = instance_variables.map do |i|
      self.instance_variable_get(i)
    end

    if @id
      ivar_string = ivar_map.join(" = ?, ") + " = ?"
      QuestionsDatabase.instance.execute(<<-SQL, *variable_values, @id)
      UPDATE
        #{table_name}
      SET
        #{ivar_string}
      WHERE
        id = ?
      SQL
    else
      ivar_string = ivar_map.join(", ")
      QuestionsDatabase.instance.execute(<<-SQL, *variable_values)
      INSERT INTO
        #{table_name} (#{ivar_string})
      VALUES
        (#{"?, " * (variable_values.length - 1) + "?"})
      SQL
      @id = QuestionsDatabase.instance.last_insert_row_id
    end
  end
end
