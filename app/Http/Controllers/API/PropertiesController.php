<?php
 
 namespace App\Http\Controllers\API;
 
 use App\Http\Controllers\Controller;
 use Illuminate\Http\Request;
 use App\Models\Property;
  
 class PropertiesController extends Controller
 {
  
     public function index()
     {
         return Property::all();
     }
  
     public function show(Property $property)
     {
         return $property;
     }
  
     public function store(Request $request)
     {
         $this->validate($request, [
         'name' => 'required|unique:properties|max:255',
 
     ]);
         $property = Property::create($request->all());
  
         return response()->json($property, 201);
     }
  
     public function update(Request $request, Property $property)
     {
         $property->update($request->all());
  
         return response()->json($property, 200);
     }
  
     public function destroy($id)
     {
       $property = Property::findOrFail($id);
       $property->delete();
   
       return response()->json($property::all());
     }
  
 }