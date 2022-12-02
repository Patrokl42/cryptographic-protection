MOD = 0b100011011 # x^8 + x^4 + x^3 + x + 1

def multiple_bytes x, y
    result = 0
    
    (0..7).step(1) do |i|
        result = result << 1

        if result & 0b100000000 != 0
            result = result ^ MOD
        end

        if y & 0b010000000 != 0
            result = result ^ x
        end

        y = y << 1
    end

    result
end

def hex_to_binary value
    binary_value = value.hex.to_s(2).rjust(value.size*4, '0')
    binary_value.to_i(2)
end

def mul02
    first_value = hex_to_binary 'D4'
    second_value = hex_to_binary '02'

    multiple_bytes(first_value, second_value)
end

def mul03
    first_value = hex_to_binary 'BF'
    second_value = hex_to_binary '03'

    multiple_bytes(first_value, second_value)
end

puts "D4 * 02 = #{mul02().to_s(16).upcase}"
puts "BF * 03 = #{mul03().to_s(16).upcase}"
