require 'hand'
require 'cards_maker'

describe Hand do
  describe "::deal_from" do

    let(:deck) { double("deck") }
    let_cards
    it "stores the hand" do
      cards = [ five_of_hearts, four_of_diamonds, three_of_spades,
                deuce_of_diamonds, ace_of_spades ]
      expect(deck).to receive(:deal).with(5).and_return(cards)
      h = Hand.deal_from(deck)
      expect(h.cards).to eq(cards)
    end
  end

  context "poker hands" do
    let_cards
    let(:royal_flush_hand) { Hand.new([ace_of_spades, king_of_spades,
      jack_of_spades, queen_of_spades, ten_of_spades]) }
    let(:four_of_a_kind_hand) { Hand.new([nine_of_hearts, nine_of_spades,
      nine_of_diamonds, nine_of_clubs, ace_of_spades]) }
    let(:full_house_hand) { Hand.new([nine_of_hearts, nine_of_spades,
      nine_of_diamonds, ace_of_hearts, ace_of_spades])}
    let(:two_pair_hand) { Hand.new([nine_of_hearts, nine_of_spades,
        ten_of_diamonds, ace_of_hearts, ace_of_spades])}
    let(:losing_hand) { Hand.new([deuce_of_spades, three_of_spades,
      four_of_diamonds, six_of_clubs, seven_of_hearts])}
    let(:ace_through_five_hand) { Hand.new([ace_of_spades, deuce_of_hearts,
      five_of_diamonds, four_of_diamonds, three_of_clubs])}
    let(:two_through_six_hand)  { Hand.new([six_of_hearts, deuce_of_hearts,
      five_of_diamonds, four_of_diamonds, three_of_clubs])}

    describe "#royal_flush?" do
      it "returns true if found" do
        expect(royal_flush_hand).to be_royal_flush
        expect(full_house_hand).to_not be_royal_flush
      end
    end

    describe "#straight_flush?" do
      it "returns true if found" do
        expect(royal_flush_hand).to be_straight_flush
        expect(full_house_hand).to_not be_straight_flush
      end
    end

    describe "#four_of_a_kind?" do
      it "returns true if found" do
        expect(four_of_a_kind_hand).to be_four_of_a_kind
        expect(full_house_hand).to_not be_four_of_a_kind
      end
    end

    describe "#full_house?" do
      it "returns true if found" do
        expect(full_house_hand).to be_full_house
        expect(losing_hand).to_not be_full_house
      end
    end

    describe "#flush?" do
      it "returns true if found" do
        expect(royal_flush_hand).to be_flush
        expect(four_of_a_kind_hand).to_not be_flush
      end
    end

    describe "#straight?" do
      it "returns true if found" do
        expect(royal_flush_hand).to be_straight
        expect(full_house_hand).to_not be_straight
        expect(ace_through_five_hand).to be_straight
        expect(two_through_six_hand).to be_straight
      end
    end

    describe "#three_of_a_kind?" do
      it "returns true if found" do
        expect(full_house_hand).to be_three_of_a_kind
        expect(royal_flush_hand).to_not be_three_of_a_kind
      end
    end

    describe "#two_pair?" do
      it "returns true if found" do
        expect(two_pair_hand).to be_two_pair
        expect(royal_flush_hand).to_not be_two_pair
      end
    end

    describe "#pair?" do
      it "returns true if found" do
        expect(two_pair_hand).to be_pair
        expect(losing_hand).to_not be_pair
      end
    end
  end
end
