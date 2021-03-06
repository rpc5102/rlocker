% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/activity.R
\name{getActivityType}
\alias{getActivityType}
\title{getActivityType}
\usage{
getActivityType(name, asJSON = FALSE)
}
\arguments{
\item{name}{Activity name}

\item{asJSON}{Return as json}
}
\value{
url
}
\description{
Lookup Activity type in default list to see if it is valid.
Returns a `url` to definition if valid; if invalid returns `-1`.
}
