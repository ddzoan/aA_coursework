# == Schema Information
#
# Table name: albums
#
#  id             :integer          not null, primary key
#  band_id        :integer          not null
#  recording_type :string           not null
#  name           :string           not null
#

class Album < ActiveRecord::Base
  validates :name, :band_id, :recording_type, presence: true
  validates :recording_type, inclusion: { in: %w(live studio) }

  belongs_to :band
  has_many :tracks, dependent: :destroy
end
