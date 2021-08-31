<?php
 
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
 
class ProductsController extends Controller
{
 
    public function index()
    {
        return Product::all();
    }
 
    public function show(Product $product)
    {
        return $product;
    }
 
    public function store(Request $request)
    {
        $this->validate($request, [
        'title' => 'required|unique:products|max:255',
    ]);
        $product = Product::create($request->all());
 
        return response()->json($product, 201);
    }
 
    public function update(Request $request, Product $product)
    {
        $product->update($request->all());
 
        return response()->json($product, 200);
    }
 
    public function destroy($id)
    {
      $product = Product::findOrFail($id);
      $product->delete();
  
      return response()->json($product::all());
    }
 
}