require 'addressable/uri'
require 'rest-client'

# url = Addressable::URI.new(
#   scheme: 'http',
#   host: 'localhost',
#   port: 3000,
#   path: '/users'
# ).to_s

# puts RestClient.patch(url, { tacos: 'good', x: 4 })
# puts RestClient.get(url)

def create_user
  url = Addressable::URI.new(
    scheme: 'http',
    host: 'localhost',
    port: 3000,
    path: '/users/1/comments'
  ).to_s

  puts RestClient.post(
    url,
       { comment: { content: "bobby"} }
  )
end

begin
  create_user
rescue RestClient::UnprocessableEntity => e
  puts e
end
