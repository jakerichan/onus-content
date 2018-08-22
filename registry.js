/**
 * Module dependencies
 */
 
var contents = {};

/**
 * Register content for a named block with a priority
 */
var findDeepest = function(name) {
  var content = contents[name] = contents[name] || {};
  return Object.keys(content).sort().reduce(function(acc, k) {
    var item = content[k];
    var location = item.l;
    var children = item.c;
    if (location === 0) acc = [children];
    if (location === 1) acc.unshift(children);
    if (location === 2) acc.push(children);
    return acc;
  }, []);
}

exports.unregister = function(name, priority) {
  var content = contents[name] = contents[name] || {};
  delete content[priority];
}
 
exports.register = function(name, children, priority, location) {
  var content = contents[name] = contents[name] || {};
  content[priority] = {c: children, l: location || 0};
};

exports.findDeepest = findDeepest