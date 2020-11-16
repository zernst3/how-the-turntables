export const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    return next()
  } else {
    res.sendStatus(403)
  }
}

export const isCurrentUserOrAdmin = (req, res, next) => {
  if (req.session.user === req.params.id || req.session.isAdmin) {
    return next()
  } else {
    res.sendStatus(403)
  }
}
