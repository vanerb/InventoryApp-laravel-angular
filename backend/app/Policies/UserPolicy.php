<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    /**
     * Determine whether the user can view any models.
     */
   public function viewAny(User $authUser): bool
   {
       return true; // opcional, para permitir listar todos los usuarios
   }

    /**
     * Determine whether the user can view the model.
     */
  public function view(User $authUser, User $user): bool
  {
      return $authUser->id === $user->id; // solo puede verse a sí mismo
  }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
   public function update(User $authUser, User $user)
   {
       return $authUser->id === $user->id; // solo puede actualizarse a sí mismo
   }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $model): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, User $model): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, User $model): bool
    {
        return false;
    }
}
