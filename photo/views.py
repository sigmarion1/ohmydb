from django.shortcuts import render
from django.views.generic.edit import CreateView, DeleteView, UpdateView
from django.views.generic.list import ListView
from django.shortcuts import redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.urls import reverse

from .models import Photo, Comment
from .forms import CommentForm, PhotoUploadForm

OMG_ALL_MEMBER = ['단체', '효정', '미미', '유아', '승희', '지호', '비니', '아린']

class PhotoListView(ListView):
    model = Photo
    paginate_by = 16
    template_name = 'photo/list.html'
    block_size = 5 # 하단의 페이지 목록 수

    def get_context_data(self, **kwargs):
        context = super(PhotoListView, self).get_context_data(**kwargs)

        start_index = int((context['page_obj'].number - 1) / self.block_size) * self.block_size
        end_index = min(start_index + self.block_size, len(context['paginator'].page_range))

        context['page_range'] = context['paginator'].page_range[start_index:end_index]

        return context


class PhotoUploadView(CreateView):
    model = Photo
    form_class = PhotoUploadForm
    template_name = 'photo/upload.html'

    def form_valid(self, form):
        form.instance.author_id = self.request.user.id
        if form.is_valid():
            if '단체' in form.cleaned_data['member']:
                form.cleaned_data['member'] = OMG_ALL_MEMBER
            
            print(form.cleaned_data['member'])
            form.instance.save()
            return redirect('/')
        else:
            return self.render_to_response({'form': form})


class PhotoDeleteView(DeleteView):
    model = Photo
    success_url = '/'
    template_name = 'photo/delete.html'

    def get_object(self, queryset=None):
        """ Hook to ensure object is owned by request.user. """
        obj = super(PhotoDeleteView, self).get_object()
        if not obj.author == self.request.user:
            raise Http404
        return obj

class PhotoUpdateView(UpdateView):
    model = Photo
    fields = ['title', 'photo', 'text']
    template_name = 'photo/update.html'


def PhotoDetailView(request, pk):
    photo = get_object_or_404(Photo, pk=pk)
    comments = photo.photo_comments.all()

    if request.method == 'POST':
        form = CommentForm(request.POST)

        if form.is_valid():
            new_comment = form.save(commit=False)
            new_comment.photo = Photo.objects.get(pk=pk)
            new_comment.author = request.user
            new_comment.save()

            return HttpResponseRedirect(reverse('photo:photo_detail', args=(pk,)))

    else:
        form = CommentForm()

    return render(request, 'photo/detail.html', {
        'object': photo,
        'comments' : comments,
        'form' : form,
    })

'''
class PhotoDetailView(CreateView):
    model = Comment
    fields = ['text']
    template_name = 'photo/detail.html'

    def form_valid(self, form):
        form.instance.author_id = self.request.user.id
        if form.is_valid():
            form.instance.save()
            return redirect('/')
        else:
            return self.render_to_response({'form': form})
            '''

