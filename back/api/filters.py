from rest_framework import filters


class MultiIdFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        """
        If ids in query parameter, Return a id filtered queryset.
        """
        if ids_string := request.GET.get("ids", ""):
            ids = [int(x) for x in ids_string.split(",")]
            return queryset.filter(pk__in=ids)
        return queryset
