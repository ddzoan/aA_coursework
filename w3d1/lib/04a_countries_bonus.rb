# == Schema Information
#
# Table name: countries
#
#  name        :string       not null, primary key
#  continent   :string
#  area        :integer
#  population  :integer
#  gdp         :integer

require_relative './sqlzoo.rb'

# BONUS QUESTIONS: These problems require knowledge of aggregate
# functions. Attempt them after completing section 05.

def highest_gdp
  # Which countries have a GDP greater than every country in Europe? (Give the
  # name only. Some countries may have NULL gdp values)
  execute(<<-SQL)
    SELECT
      name
    FROM
      countries
    WHERE
      gdp > (
        SELECT
          MAX(gdp)
        FROM
          countries
        WHERE
          continent = 'Europe'
        GROUP BY
          continent
      )
  SQL
end

def largest_in_continent
  # Find the largest country (by area) in each continent. Show the continent,
  # name, and area.
  execute(<<-SQL)
  SELECT
    continent, name, area
  FROM
    countries AS a
  WHERE
    area = (
      SELECT
        MAX(area)
      FROM
        countries AS b
      WHERE
        b.continent = a.continent
      GROUP BY
        b.continent
      )
  SQL
end

def large_neighbors
  # Some countries have populations more than three times that of any of their
  # neighbors (in the same continent). Give the countries and continents.
  execute(<<-SQL)
    SELECT
      name, continent
    FROM
      countries AS a
    WHERE
      population > 3 * (
        SELECT
          MAX(population)
        FROM
          countries AS b
        WHERE
          b.continent = a.continent AND
          b.name != a.name
        GROUP BY
          continent
      )
  SQL
end
