from django import forms
from django.forms import ModelForm

from .models import Comment, Photo

OMG_MEMBER_CHOICES = [
    ('단체', '단체(all)'),
    ('효정', '효정(hyojung)'),
    ('미미', '미미(mimi)'),
    ('유아', '유아(yooa)'),
    ('승희', '승희(seunghee)'),
    ('지호', '지호(jiho)'),
    ('비니', '비니(binnie)'),
    ('아린', '아린(arin)'),
]

class CommentForm(ModelForm):
    
    
    class Meta:
        model = Comment
        fields = ('text',)
        widgets = {
            'text': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'leave a comment'
            }),
        }
        labels = {
            'text' : 'Comment :',
        }


class PhotoUploadForm(ModelForm):
    member = forms.MultipleChoiceField(
                required=False,
                widget=forms.CheckboxSelectMultiple,
                choices=OMG_MEMBER_CHOICES,
            )

    class Meta:
        model = Photo
        fields = ['title', 'photo', 'text']