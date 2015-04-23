require 'rspec'
require 'card.rb'

describe Card do
  let(:card1) { Card.new(:ace, :spades) }
  let(:card2) { Card.new(:queen, :diamonds) }
  let(:card3) { Card.new(:seven, :clubs) }

  describe "#suit" do
    it "responds with card suit" do
      expect(card1.suit).to eq(:spades)
    end
  end

  describe "#value" do
    it "responds with card value" do
      expect(card1.value).to eq(:ace)
    end
  end

  describe "#string" do
    it "responds with correct string" do
      expect(card1.string).to eq('A♠')
    end
  end

  describe "#power_level" do
    it "returns the poker card strength" do
      expect(card1.power_level).to eq(14)
      expect(card2.power_level).to eq(12)
      expect(card3.power_level).to eq(7)
    end
  end
end
