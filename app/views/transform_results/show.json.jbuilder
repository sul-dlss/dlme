# frozen_string_literal: true

json.links do
  json.prev path_to_prev_page(@results) if @results.prev_page
  json.next path_to_next_page(@results) if @results.next_page
end

json.data @results
