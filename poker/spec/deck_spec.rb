require 'rspec'
require 'deck.rb'

describe Deck do
  describe "::all_cards" do
    subject(:full_deck) { Deck.all_cards }

    it "starts with 52 cards" do
      expect(full_deck.cards.length).to eq(52)
    end

    it "contains unique cards" do
      expect(full_deck.cards.map { |card| card.string }.uniq.length).to eq(52)
    end
  end

  describe 'instance methods' do
    let(:cards) do
      [Card.new(:deuce, :diamonds),
        Card.new(:ace, :spades),
        Card.new(:seven, :hearts),
        Card.new(:king, :clubs)
        ]
    end
    subject(:deck) { Deck.new(cards.dup) }

    describe "#deal" do
      it "can deal 1 card properly" do
        first_card = cards.first
        expect(deck.deal(1)).to eq([first_card])
      end

      it "can deal multiple cards" do
        expect(deck.deal(4)).to eq(cards)
      end

      it "removes a card from the deck" do
        dealt_card = deck.deal(1)
        expect(deck.cards.length).to eq(3)
        expect(deck.cards).to_not include(*dealt_card)
      end

      it "removes cards from the deck" do
        dealt_cards = deck.deal(3)
        expect(deck.cards.length).to eq(1)
        expect(deck.cards).to_not include(*dealt_cards)
      end
    end

    describe "#shuffle!" do
      it "changes the order of the cards" do
        deck.shuffle!
        expect(deck.cards).to_not eq(cards)
      end
    end

  end
end
