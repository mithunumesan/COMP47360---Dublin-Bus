from django.db import models
from django.contrib.auth.models import User
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
# Create your models here.
class UserFavouriteRoute(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    start_point = models.TextField()
    destination = models.TextField()
    
    def _str_(self):
     return str(self.user)