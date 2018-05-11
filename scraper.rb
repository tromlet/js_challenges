#!/usr/bin/ruby
require 'json'
require 'nokogiri'
require 'open-uri'
require 'byebug'

def wrap(s, width=80)
  s.gsub(/(.{1,#{width}})(\s+|\Z)/, "\\1\n")
end

def convert_types(type)
  newtype = type.gsub("int", "number")
  newtype = newtype.gsub("String", "string")
end

def get_testcases(codeform, challenge)

  return_stmt = case challenge[:return_type]
  when 'boolean'
    'return false'
  when 'number'
    'return 0'
  when 'string'
    'return ""'
  when 'number[]'
    'return new int[0]'
  when 'string[]'
    'return new String[0]'
  when 'List'
    'return new ArrayList<String>()'
  end

  params = {
    'id'     => codeform.at_css('input[name="id"]').values[2],
    'cuname' => codeform.at_css('input[name="cuname"]').values[2],
    'owner'  => codeform.at_css('input[name="owner"]').values[2],
    'adate'  => codeform.at_css('input[name="adate"]').values[2],
    'code'   => challenge[:code].gsub(/(\n\})/, "#{return_stmt}\;\\1"),
  }
  url = URI.parse('http://codingbat.com/run')
  resp = Net::HTTP.post_form(url, params)
  testcases = []
  if resp.code == "200" and resp.body.match('<th>Expected</th>')
    tng = Nokogiri::HTML(resp.body)
    tng.css('tr > td:nth-child(1)').each do |td|
      testcases << td.content.split(" → ") if td.content.include? " → "
    end
  else
    puts "===========================\n!!!!!ERROR GETTING TESTCASES!!!!!\n==========================="
    puts resp.body
  end
  return testcases
end

def test_error(resp)
  puts "ERROR RETRIEVING TEST CASES"
  puts resp.body
  throw new Error("ERROR RETRIEVING TEST CASES\n" + resp.body)
end

def compose_challenge(challenge)
  str = "\n\n\n/*\n#{'=' * 80}\n#{wrap challenge[:text]}\n"
  jsparams = challenge[:parameters].map do |param|
    param.split(" ")[1]
  end
  typed_params = challenge[:parameters].map do |param|
    arr = param.split(" ")
    "#{arr[1]}: #{arr[0]}"
  end
  str += "Has #{challenge[:parameters].size} parameters (#{typed_params.join(', ')})\n"
  str += "returns #{challenge[:return_type]}\n#{'=' * 80}*/\n\n"
  str += "function #{challenge[:title]}(#{jsparams.join(", ")}) {\n"
  str += "  // YOUR CODE HERE\n"
  str += "}\n\ntester.test(#{challenge[:title]}, [\n"

  challenge[:testcases].each do |tc|
    # test(`parrotTrouble(true, 6)`, true); //true
    # debugger
    str += "  {input: [#{tc[0].match(/\((.*)\)/)[1]}], output: #{tc[1]}},\n"
  end

  str += ']);'

  puts str
end

def get_challenge(url)
  doc = Nokogiri::HTML(open(url))

  indent = doc.at_css('.indent')
  table = indent.at_css('table')
  max2 = table.at_css('.max2')
  challenge = {}
  challenge[:title] = indent.at_css('.h2:nth-child(2)').content
  challenge[:text] = max2.content
  challenge[:code] = indent.at_css('#ace_div').content
  challenge[:return_type] = convert_types challenge[:code].match(/(public\s)?([\w\[\]]+)\s/)[2]
  challenge[:parameters] = (convert_types challenge[:code].match(/\A(public\s)?\S+\s\w+\(([^\)]+)\)/)[2]).split(', ')

  codeform = indent.at_css('form[name="codeform"]')
  challenge[:testcases] = get_testcases(codeform, challenge)

  compose_challenge challenge
end

get_challenge(ARGV[0])
# get_challenge('http://codingbat.com/prob/p181646')
# get_challenge('http://codingbat.com/prob/p143461')
