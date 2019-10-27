from random import shuffle

from django.shortcuts import render
from django.views.generic.edit import CreateView, DeleteView, UpdateView, FormMixin
from django.views.generic.list import ListView
from django.shortcuts import redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.urls import reverse
from django.core.mail import send_mail

from .models import Photo, Comment, Member
from .forms import CommentForm, PhotoUploadForm

MAX_PHOTO = 24

class PhotoRandomListView(ListView):
    paginate_by = MAX_PHOTO
    template_name = 'photo/list.html'

    def get_queryset(self):

        if self.request.GET.get('members'):
            selection = self.request.GET.get("members")
            mb = get_object_or_404(Member, name_eng=selection)
            all_photo = mb.photo_set.all()

        else:
            all_photo = Photo.objects.all()
        
        return all_photo



class PhotoListView(ListView):
    model = Photo
    paginate_by = 24
    template_name = 'photo/list.html'
    block_size = 10 # 하단의 페이지 목록 수

    def get_context_data(self, **kwargs):
        context = super(PhotoListView, self).get_context_data(**kwargs)
        paginator = context['paginator']
        print(paginator)
        page_numbers_range = 5  # Display only 5 page numbers
        max_index = len(paginator.page_range)
        print(max_index)

        page = self.request.GET.get('page')
        current_page = int(page) if page else 1

        start_index = int((current_page - 1) / page_numbers_range) * page_numbers_range
        end_index = start_index + page_numbers_range
        if end_index >= max_index:
            end_index = max_index

        page_range = paginator.page_range[start_index:end_index]
        print(page_range)
        context['page_range'] = page_range
        return context

    def get_queryset(self):
        queryset = Photo.objects.all()
        if self.request.GET.get('members'):
            selection = self.request.GET.get("members")
            mb = get_object_or_404(Member, name_eng=selection)
            queryset = mb.photo_set.all()

        return queryset
        


class PhotoUploadView(CreateView):
    model = Photo
    form_class = PhotoUploadForm
    template_name = 'photo/upload.html'

    def form_valid(self, form):
        form.instance.author_id = self.request.user.id
        return super(PhotoUploadView, self).form_valid(form)

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
    form_class = PhotoUploadForm
    template_name = 'photo/update.html'


def PhotoDetailView(request, pk):
    photo = get_object_or_404(Photo, pk=pk)
    comments = photo.photo_comments.all()
    members = photo.members.all()

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
        'members' : members,
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

