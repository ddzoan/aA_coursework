require 'card'

def let_cards
  Card::VALUE_STRINGS.each_key do |value|
    Card::SUIT_STRINGS.each_key do |suit|
      let("#{value}_of_#{suit}".to_sym) do
        double("#{value}_of_#{suit}", value: value, suit: suit, power_level: Card::STRENGTH[value])
      end
    end
  end
end
