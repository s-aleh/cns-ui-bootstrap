# cns-ui-bootstrap
AngularJS Bootstrap UI

## Installation
Installation is easy as cns-ui has minimal dependencies - only the AngularJS and Bootstrap's CSS are required.

```javascript
<script type="text/javascript" src="cns.ui.bootstrap.js"></script>
```

```javascript
angular.module('myModule', ['cns.ui.bootstrap']);
```

##Pagination

```html
<cns-pagination total-pages="218" ng-model="currentPage"></cns-pagination>
```

##Pager

```html
<cns-pager total-pages="218" ng-model="currentPage"></cns-pager>
```

##Rating

```html
<cns-rating ng-model="rating" rating="4.0"></cns-rating>
```
