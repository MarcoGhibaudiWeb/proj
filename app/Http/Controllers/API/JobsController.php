<?php
 
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Job;
 
class JobsController extends Controller
{
 
    public function index()
    {
        return Job::all();
    }
 
    public function show(Job $job)
    {
        return $job;
    }
 
    public function store(Request $request)
    {
        $this->validate($request, [
        'summary' => 'max:150',
        'description' => 'max:500',
        'status' => 'required|max:15',
        'property' => 'required|max:10',

    ]);
        $job = Job::create($request->all());
 
        return response()->json($job, 201);
    }
 
    public function update(Request $request, Job $job)
    {
        $job->update($request->all());
 
        return response()->json($job, 200);
    }
 
    public function destroy($id)
    {
      $job = Job::findOrFail($id);
      $job->delete();
  
      return response()->json($job::all());
    }
 
}