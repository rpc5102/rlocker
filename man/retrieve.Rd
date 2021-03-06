% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/request.R
\name{retrieve}
\alias{retrieve}
\title{Makes a simple HTTP GET request to Learning Locker API}
\usage{
retrieve(interface = NULL, model = NULL, query = NULL, asJSON = FALSE)
}
\arguments{
\item{interface}{HTTP \code{\link{Interface}}}

\item{model}{API \code{\link{Model}}}

\item{query}{(optional) Filter}

\item{asJSON}{(optional) Return content as json string}
}
\value{
response content
}
\description{
Makes a simple HTTP GET request to Learning Locker API
}
\details{
\link{https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html}
}
\examples{
retrieve(interface = "rest", model = "lrs")
retrieve(interface = "connection", model = "statement", query = "first=1", asJSON = TRUE)
retrieve(interface = "connection", model = "statement", query = "?sort=\%7b\%22timestamp\%22\%3a-1\%2c\%22statement.id\%22\%3a1\%7d", asJSON = TRUE)

}
\seealso{
\link{https://docs.learninglocker.net/http-statements/}
}
