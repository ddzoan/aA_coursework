require 'card.rb'

class Deck
  attr_reader :cards

  def self.all_cards
    cards = []
    Card::VALUE_STRINGS.keys.each do |value|
      Card::SUIT_STRINGS.keys.each do |suit|
        cards << Card.new(value, suit)
      end
    end
    Deck.new(cards)
  end

  def initialize(cards)
    @cards = cards
  end

  def deal(num)
    dealt_cards = []
    num.times do
      dealt_cards << @cards.shift
    end
    dealt_cards
  end

  def shuffle!
    cards.shuffle!
  end
end
