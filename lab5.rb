# RELIABILITY = 50;

# class RSA
#     @@x, @@y = 0, 0

#     def encryption(message)
#         p,q = 53, 17
#         n = p*q
#         e = 31
#         phi = (p-1)*(q-1)

#         while (e < phi)
#             if(gcdex(e, phi) === 1)
#                 break;
#             else
#                 e += 1;
#             end
#         end

#         d = inverse_element(e, phi)

#         message ** e % n
#     end

#     def decription(ciphertext)
#         p,q = 53, 17
#         n = p*q
#         e = 31
#         phi = (p-1)*(q-1)

#         while (e < phi)
#             if(gcdex(e, phi) === 1)
#                 break;
#             else
#                 e += 1;
#             end
#         end

#         d = inverse_element(e, phi)

#         ciphertext ** d % n
#     end

#     private
#     def miller_rabin_prime?(n, g)
#         d = n - 1
#         s = 0
#         while d % 2 == 0
#             d /= 2
#             s += 1
#         end
#         g.times do
#             a = 2 + rand(n - 4)
#             x = a.pow(d, n)
#             next if x == 1 || x == n - 1
#             for r in (1..s - 1)
#             x = x.pow(2, n)
#             return false if x == 1
#             break if x == n - 1
#             end
#             return false if x != n - 1
#         end
#         true
#     end
    
#     def generateRandomNumbers
#         p,q = 0
    
#         while true
#             p = rand(1...100)
    
#             if miller_rabin_prime?(p, RELIABILITY)
#                 break;
#             end
#         end
        
#         iterator = 0;
    
#         while true
#             iterator += 1;
#             q = p + iterator
    
#             if miller_rabin_prime?(q, RELIABILITY)
#                 break;
#             end
#         end
    
#         return p, q
#     end
    
#     def gcdex(a, b)
#         if (a == 0)
#             @@x = 0;
#             @@y = 1;
#             return b;
#         end
          
#         gcd = gcdex(b % a, a);
#         x1 = @@x;
#         y1 = @@y;
    
#         c = b / a
    
#         @@x = y1 - c.floor() * x1;
#         @@y = x1;
      
#         return gcd;
#     end

#     def inverse_element(a, m)
#         g = gcdex(a, m);
#         if (g != 1)
#             puts "Inverse doesn't exist"
#         else
#             res = (@@x % m + m) % m;
#             return res
#         end
#     end

#     def phi m
#         result = 1;
#         i = 2
#         while i < m do
#             result += 1 if (gcdex(i, m) == 1)
#             i += 1
#         end

#         result
#     end
# end

# message = 18
# rsa = RSA.new()

# puts "Повідомлення: #{message}"
# encrypted_text = rsa.encryption(18)
# puts "Зашифроване повідомлення: #{encrypted_text}"
# decrypted_text = rsa.decription(783)
# puts "Розшифроване повідомлення: #{decrypted_text}"

RELIABILITY = 50;

class RSA
    @@x, @@y = 0, 0

    def initialize()
        @p,@q = generateRandomNumbers
        @n = @p*@q
        @phi = (@p-1)*(@q-1)
        puts @p
        puts @q
        @e = phi(@phi)
        # puts @e
        # puts @e
        @d = inverse_element(@e, @phi)
     end

    def encryption(message)
        # message ** @e % @n
        # message
    end

    def decription(ciphertext)
        # puts @d
        # ciphertext ** @d % @n
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

    def miller_rabin_prime?(n, g)
        d = n - 1
        s = 0
        while d % 2 == 0
            d /= 2
            s += 1
        end
        g.times do
            a = 2 + rand(n - 4)
            x = a.pow(d, n)
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
    
    def generateRandomNumbers
        p,q = 0
    
        while true
            p = rand(1...100)
    
            if miller_rabin_prime?(p, RELIABILITY)
                break;
            end
        end
        
        iterator = 0;
    
        while true
            iterator += 1;
            q = p + iterator
    
            if miller_rabin_prime?(q, RELIABILITY)
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
        puts a
        puts m
        g = gcdex(a, m);
        if (g != 1)
            puts "Inverse doesn't exist"
        else
            res = (@@x % m + m) % m;
            return res
        end
    end

    def phi m
        result = 1;
        i = 2
        while i < m do
            result += 1 if (gcdex(i, m) == 1)
            i += 1
        end

        result
    end
end

message = 18
rsa = RSA.new()

# puts "Повідомлення: #{message}"
encrypted_text = rsa.encryption(message)

# puts "Зашифроване повідомлення: #{encrypted_text}"
decrypted_text = rsa.decription(encrypted_text)

# puts "Розшифроване повідомлення: #{decrypted_text}"