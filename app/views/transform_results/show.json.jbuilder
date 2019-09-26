# frozen_string_literal: true

empty_links = {}

json.links do
  json.prev path_to_prev_page(@results) if @results.prev_page
  json.next path_to_next_page(@results) if @results.next_page
  # Prevents the `links` object from being `undefined` if neither conditions above are true
  json.merge!(empty_links)
end

json.data @results
