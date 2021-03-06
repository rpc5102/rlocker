#'activity
#'
#' xAPI Activity object definitions
#'
#' @name activity
#' @section Details:
#'  A Statement can represent an Activity as the Object of the Statement.
#' @seealso \link{https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#activity-definition}
NULL

#' getActivityType
#' 
#' Lookup Activity type in default list to see if it is valid.
#' Returns a `url` to definition if valid; if invalid returns `-1`.
#' 
#' @param name Activity name
#' @param asJSON Return as json
#' 
#' @return url
#' 
#'@export
getActivityType <- function(name, asJSON = FALSE) {
  exists <- exists(name, activityTypes)

  if (exists & asJSON) {
    return(formatJSON(activityTypes[[name]]))
  } else if (exists) {
    return(activityTypes[[name]])
  } else {
    return(-1)
  }
}

#' getActivityTypes
#' 
#' Returns a list of the default Activity types.
#' 
#' @return list
#' 
#'@export
getActivityTypes <- function() {
  return(names(activityTypes))
}

activityTypes <- list(
  "assessment" = "http://adlnet.gov/expapi/activities/assessment",
  "attempt" = "http://adlnet.gov/expapi/activities/attempt",
  "course" = "http://adlnet.gov/expapi/activities/course",
  "file" = "http://adlnet.gov/expapi/activities/file",
  "interaction" = "http://adlnet.gov/expapi/activities/interaction",
  "lesson" = "http://adlnet.gov/expapi/activities/lesson",
  "link" = "http://adlnet.gov/expapi/activities/link",
  "media" = "http://adlnet.gov/expapi/activities/media",
  "meeting" = "http://adlnet.gov/expapi/activities/meeting",
  "module" = "http://adlnet.gov/expapi/activities/module",
  "objective" = "http://adlnet.gov/expapi/activities/objective",
  "performance" = "http://adlnet.gov/expapi/activities/performance",
  "profile" = "http://adlnet.gov/expapi/activities/profile",
  "question" = "http://adlnet.gov/expapi/activities/question",
  "simulation" = "http://adlnet.gov/expapi/activities/simulation"
)
