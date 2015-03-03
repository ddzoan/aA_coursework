# == Schema Information
#
# Table name: albums
#
#  asin        :string       not null, primary key
#  title       :string
#  artist      :string
#  price       :float
#  rdate       :date
#  label       :string
#  rank        :integer
#
# Table name: styles
#
# album        :string       not null
# style        :string       not null
#
# Table name: tracks
# album        :string       not null
# disk         :integer      not null
# posn         :integer      not null
# song         :string

require_relative './sqlzoo.rb'

def alison_artist
  # Select the name of the artist who recorded the song 'Alison'.
  execute(<<-SQL)
    SELECT
      artist
    FROM
      albums
    JOIN
      tracks ON tracks.album = albums.asin
    WHERE
      tracks.song = 'Alison'
  SQL
end

def exodus_artist
  # Select the name of the artist who recorded the song 'Exodus'.
  execute(<<-SQL)
  SELECT
    artist
  FROM
    albums
  JOIN
    tracks ON tracks.album = albums.asin
  WHERE
    tracks.song = 'Exodus'
  SQL
end

def blur_songs
  # Select the `song` for each `track` on the album `Blur`.
  execute(<<-SQL)
  SELECT
    tracks.song
  FROM
    albums
  JOIN
    tracks ON tracks.album = albums.asin
  WHERE
    title = 'Blur'
  SQL
end

def heart_tracks
  # For each album show the title and the total number of tracks containing
  # the word 'Heart' (albums with no such tracks need not be shown). Order by
  # the number of such tracks.
  execute(<<-SQL)
    SELECT
      title, COUNT(*)
    FROM
      albums
    JOIN
      tracks ON tracks.album = albums.asin
    WHERE
      tracks.song ~ 'Heart'
    GROUP BY
      title
    ORDER BY
      COUNT(*) DESC
  SQL
end

def title_tracks
  # A 'title track' has a `song` that is the same as its album's `title`. Select
  # the names of all the title tracks.
  execute(<<-SQL)
  SELECT
    title
  FROM
    albums
  JOIN
    tracks ON tracks.album = albums.asin
  WHERE
    title = tracks.song
  SQL
end

def eponymous_albums
  # An 'eponymous album' has a `title` that is the same as its recording
  # artist's name. Select the titles of all the eponymous albums.
  execute(<<-SQL)
  SELECT
    title
  FROM
    albums
  WHERE
    artist = title
  SQL
end

def song_title_counts
  # Select the song names that appear on more than two albums. Also select the
  # COUNT of times they show up.
  execute(<<-SQL)
  SELECT
    tracks.song, COUNT(*)
  FROM
    albums
  JOIN
    tracks ON tracks.album = albums.asin
  GROUP BY
    tracks.song
  HAVING
    COUNT(*) > 2
  SQL
end

def best_value
  # A "good value" album is one where the price per track is less than 50
  # pence. Find the good value albums - show the title, the price and the number
  # of tracks.
  execute(<<-SQL)
    SELECT
      title, MAX(price), COUNT(*)
    FROM
      albums
    JOIN
      tracks ON tracks.album = albums.asin
    GROUP BY
      title
    HAVING
      MAX(price) / COUNT(*) < 0.5
  SQL
end

def top_track_counts
  # Wagner's Ring cycle has an imposing 173 tracks, Bing Crosby clocks up 101
  # tracks. List the top 10 albums in order of track count. Select both the
  # album title and the track count.
  execute(<<-SQL)
    SELECT
      title, COUNT(*)
    FROM
      albums
    JOIN
      tracks ON tracks.album = albums.asin
    GROUP BY
      title
    ORDER BY
      COUNT(*) DESC
    LIMIT
      10
  SQL
end

def soundtrack_wars
  # Select the artist who has recorded the most soundtracks, as well as the
  # number of albums. HINT: use LIKE '%Soundtrack%' in your query.
  execute(<<-SQL)
  SELECT
    artist, COUNT(*)
  FROM
    albums
  JOIN
    styles ON styles.album = albums.asin
  WHERE
    styles.style ~ 'Soundtrack'
  GROUP BY
    artist
  ORDER BY
    COUNT(*) DESC
  LIMIT
    1
  SQL
end

def expensive_tastes
  # Select the five styles of music with the highest average price per track,
  # along with the price per track. One or more of each aggregate functions,
  # subqueries, and joins will be required.
  execute(<<-SQL)
    SELECT
      style, AVG(ppt)
    FROM
      styles
    JOIN
      tracks ON tracks.album = styles.album
    JOIN
      (
        SELECT
          asin, MAX(price) / COUNT(*) AS ppt
        FROM
          albums
        JOIN
          tracks ON asin = tracks.album
        GROUP BY
          asin
      ) AS ppts ON ppts.asin = styles.album
    WHERE
      ppt IS NOT NULL
    GROUP BY
      style
    ORDER BY
      AVG(ppt) DESC
    LIMIT
      5
  SQL
end
