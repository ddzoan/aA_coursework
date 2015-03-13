# == Schema Information
#
# Table name: tracks
#
#  id         :integer          not null, primary key
#  album_id   :integer          not null
#  track_type :string           not null
#  lyrics     :text
#  name       :string           not null
#

class Track < ActiveRecord::Base
  validates :name, :album_id, :track_type, presence: true
  validates :track_type, inclusion: { in: %w(regular bonus) }

  belongs_to :album
end
