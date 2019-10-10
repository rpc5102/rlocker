<!-- README.md is generated from README.Rmd. Please edit that file -->

# rlocker

Learning Locker xAPI support for Shiny Applications.

### Assumptions

1.  This package assumes that you have [Learning
    Locker](https://www.ht2labs.com/learning-locker-community/overview/)
    set up and reachable by your application.
2.  Your application is running in an environment that supports
    [Cross-Origin Resource Sharing
    (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS);
    otherwise api requests will be blocked.
3.  You are given consent by the application user(s) to collect activity
    data on them.

### Installation

You can install the released version of rlocker from
[GitHub](https://github.com/) with:

``` r
devtools::install_github("rpc5102/rlocker")
```

### Example

See the [examples](./inst/examples/) folder for a demo application.

#### Method 1: R handler

###### app.R

``` r
library(shiny)
library(rlocker)

shinyApp(
  server = function(input, output, session) {

    # Initialize Learning Locker connection -- substitute with your own locker credentials
    rlocker::connect(session, list(
      base_url = "https://learning-locker.example.com/",
      endpoint = "/data/xAPI/",
      auth = "Basic YWNjb3VudEBlbWFpbC5jb206c3VwZXJzZWNyZXRwYXNzd29yZA"
    ))

    # Register input event for interactive elements
    observeEvent(input$button, {
      statement <- rlocker::createStatement()
      rlocker::store(statment)
    })
  }
)
```

#### Method 2: JavaScript handler

###### app.R

``` r
library(shiny)
library(rlocker)

shinyApp(
  ui = fluidPage(
    # Attach js logic
    tags$script(src = "js/app.js"),
    
    # Application title
    titlePanel("rlocker demo"),
    fluidRow(
      actionButton("button", "Press me!")
    )
  ),
  server = function(input, output, session) {

    # Initialize Learning Locker connection -- substitute with your own locker credentials
    config <- jsonlite::toJSON(
      list(
        base_url = "https://learning-locker.example.com/",
        endpoint = "/data/xAPI/",
        auth = "Basic YWNjb3VudEBlbWFpbC5jb206c3VwZXJzZWNyZXRwYXNzd29yZA"
      ),
      pretty = TRUE,
      auto_unbox = TRUE,
      force = TRUE
    )
    
    session$sendCustomMessage(type = 'rlocker-setup', config)
    
    # Register input events for interactive elements
    observeEvent(input$button, {
      session$sendCustomMessage(type = 'rlocker-store', rlocker::createStatement())
    })
  }
)
```

###### www/js/app.js

``` js
Shiny.addCustomMessageHandler('rlocker-setup', function(config) {
  /* connection logic */
});

Shiny.addCustomMessageHandler('rlocker-store', function(values) {
  /* storage logic */
});
```

See [adlnet/xAPIWrapper](https://github.com/adlnet/xAPIWrapper/) for
JavaScript implementations.

### Configuration

| option    | default                                                  |
| --------- | -------------------------------------------------------- |
| base\_url | <http://localhost:8000/xapi/>                            |
| endpoint  | /data/xAPI/                                              |
| auth      | Basic YWNjb3VudEBlbWFpbC5jb206c3VwZXJzZWNyZXRwYXNzd29yZA |
| username  | null                                                     |
| password  | null                                                     |

**Note**: *base\_url* should be the hosting location for your locker’s
API *without* any endpoint or home.
