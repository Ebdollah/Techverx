from django import forms

class ReviewForm(forms.Form):
  user_name = forms.CharField(label='Name', max_length=100)
  review_text = forms.CharField(label='Your feedback', widget=forms.Textarea)
  rating = forms.IntegerField(label='Rating', min_value=1, max_value=5)