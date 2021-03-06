% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/agent.R
\name{createAgent}
\alias{createAgent}
\title{Create an xAPI Agent}
\usage{
createAgent(agent = NULL, warn = FALSE, ...)
}
\arguments{
\item{agent}{Agent params}

\item{warn}{Show warnings}
}
\value{
Agent
}
\description{
Create an xAPI Agent
}
\examples{
createAgent(
  agent = list(
    name = "John Doe",
    mbox = "mailto:john@example.com"
  )
)

}
\seealso{
\code{agent}
}
