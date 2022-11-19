K = 4127;

class RSA
    @@x, @@y = 0, 0

    def initialize()
        @p,@q = generateRandomNumbers
        @n = @p*@q
        @phi = (@p-1)*(@q-1)
        @e = 31
        @d = inverse_element(@e, @phi)
     end

    def encryption(message)
        message ** @e % @n
    end

    def decription(ciphertext)
        ciphertext ** @d % @n
    end

    def miller_rabin_prime?(n, g)
        d = n - 1
        s = 0
        a = 0
        while d % 2 == 0
            d /= 2
            s += 1
        end
        g.times do |iterator|
            a = 2 + rand(n - 4)
            x = (a**d) % n
            next if x == 1 || x == n - 1
            for r in (1..s - 1)
            x = x.pow(2, n)
            return false if x == 1
            break if x == n - 1
            end
            return false if x != n - 1
        end
        true
    end

    private
    def generate_open_key(e, phi)
        result = e

        while (result < phi)
            puts gcdex(e, phi) == 1
            if(gcdex(e, phi) == 1)
                break;
            else
                result += 1;
            end
        end

        result
    end
    
    def generateRandomNumbers
        p,q = 0
    
        while true
            p = rand(1...100)
    
            if miller_rabin_prime?(p, K)
                break;
            end
        end
        
        iterator = 0;
    
        while true
            iterator += 1;
            q = p + iterator
    
            if miller_rabin_prime?(q, K)
                break;
            end
        end
    
        return p, q
    end
    
    def gcdex(a, b)
        if (a == 0)
            @@x = 0;
            @@y = 1;
            return b;
        end
          
        gcd = gcdex(b % a, a);
        x1 = @@x;
        y1 = @@y;
    
        c = b / a
    
        @@x = y1 - c.floor() * x1;
        @@y = x1;
      
        return gcd;
    end

    def inverse_element(a, m)
        g = gcdex(a, m);
        if (g != 1)
            puts "Inverse doesn't exist"
        else
            res = (@@x % m + m) % m;
            return res
        end
    end
end
rsa = RSA.new()

test_number = 12

puts "Тест простоти числа: #{test_number}"
puts "#{rsa.miller_rabin_prime?(test_number, K) ? "Число просте" : "Число складене"}"

puts "-------------------------"

message = 18

puts "Повідомлення: #{message}"
encrypted_text = rsa.encryption(message)

puts "Зашифроване повідомлення: #{encrypted_text}"
decrypted_text = rsa.decription(encrypted_text)

puts "Розшифроване повідомлення: #{decrypted_text}"