from rest_framework import filters


class MultiIdFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        """
        Return a filtered queryset.
        """

        ids = [int(x) for x in request.GET.get("ids", "").split(",")]
        return queryset.filter(pk__in=ids)
