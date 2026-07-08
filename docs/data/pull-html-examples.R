# Pull public HTML structure from portfolio examples.
# Run this from the project root after installing rvest:
# install.packages(c("rvest", "dplyr", "readr", "purrr", "stringr"))

library(rvest)
library(dplyr)
library(readr)
library(purrr)
library(stringr)

sources <- tibble::tribble(
  ~source_name, ~url,
  "Lucynda Young portfolio example", "https://cynyng.github.io/portfolio/",
  "Jeffrey Hsu resume example", "https://hsujeffrey.github.io/hsu-website-portfolio/resume.html"
)

extract_page <- function(source_name, url) {
  page <- read_html(url)

  tibble(
    source_name = source_name,
    url = url,
    page_title = page |> html_element("title") |> html_text2(),
    main_headings = page |>
      html_elements("h1, h2, h3") |>
      html_text2() |>
      unique() |>
      head(14) |>
      str_c(collapse = " | "),
    navigation_pattern = page |>
      html_elements("nav a, .navbar a") |>
      html_text2() |>
      discard(~ .x == "") |>
      unique() |>
      head(12) |>
      str_c(collapse = " | "),
    link_count = page |> html_elements("a") |> length(),
    portfolio_takeaway = "Use clear page tabs, resume download links, project/analytics sections, and professional contact links; model structure only, do not copy wording."
  )
}

benchmark <- pmap_dfr(sources, extract_page)

write_csv(benchmark, "data/portfolio-example-benchmark.csv")
benchmark
