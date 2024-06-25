from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.NoteListCreate.as_view(), name='note-list-create'), 
    path('notes/delete/<int:pk>/', views.NoteDelete.as_view(), name='note-delete'),
    path('notes/all/', views.AllNotesList.as_view(), name='all-notes-list'),
    path('user/', views.UserDetail.as_view(), name='user-detail'),
]