require 'card'

class Hand
  attr_reader :cards

  def self.deal_from(deck)
    Hand.new(deck.deal(5))
  end

  def initialize(cards)
    @cards = cards
  end

  def royal_flush?
    straight_flush? &&
      values.include?(Card::STRENGTH[:king]) &&
      values.include?(Card::STRENGTH[:ace])
  end

  def straight_flush?
     straight? && flush?
  end

  def four_of_a_kind?
    values_hash.values.include?(4)
  end

  def full_house?
    values_hash.values.include?(2) &&
      values_hash.values.include?(3)
  end

  def flush?
    suits.count(suits.first) == 5
  end

  def straight?
    sorted = values.sort
    sorted.pop if sorted.first == 2 && sorted.last == Card::STRENGTH[:ace]
    first = sorted.first
    sorted.each_with_index do |val, i|
      return false unless val == first + i
    end
  end

  def three_of_a_kind?
    values_hash.values.include?(3)
  end

  def two_pair?
    values_hash.values.count(2) == 2
  end

  def pair?
    values_hash.values.include?(2)
  end

  def suits
    cards.map { |card| card.suit }
  end

  def values
    cards.map { |card| card.power_level }
  end

  def values_hash
    values.each_with_object(Hash.new(0)) do |val, hash|
      hash[val] += 1
    end
  end
end
