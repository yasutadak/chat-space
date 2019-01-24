json.array! @new_messages do |message|
  json.content @message.content
  json.user_name @message.user.name
  json.time @message.created_at.strftime("%Y/%m/%d %H:%M")
  json.image @message.image
  json.id @message.id
end
