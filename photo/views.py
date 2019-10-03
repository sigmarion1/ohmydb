from django.shortcuts import render
from django.views.generic.edit import CreateView, DeleteView, UpdateView
from django.views.generic.list import ListView
from django.shortcuts import redirect

from .models import Photo


class PhotoListView(ListView):
    model = Photo
    paginate_by = 16
    template_name = 'photo/list.html'


class PhotoUploadView(CreateView):
    model = Photo
    fields = ['title', 'photo', 'text']
    template_name = 'photo/upload.html'

    def form_valid(self, form):
        form.instance.author_id = self.request.user.id
        if form.is_valid():
            form.instance.save()
            return redirect('/')
        else:
            return self.render_to_response({'form': form})


class PhotoDeleteView(DeleteView):
    model = Photo
    success_url = '/'
    template_name = 'photo/delete.html'

class PhotoUpdateView(UpdateView):
    model = Photo
    fields = ['title', 'photo', 'text']
    template_name = 'photo/update.html'
