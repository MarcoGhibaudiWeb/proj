<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $fillable = ['name', 'summary', 'description', 'status', 'property', 'fname', 'lname'];
}
