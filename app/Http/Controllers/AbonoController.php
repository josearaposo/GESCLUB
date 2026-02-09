<?php

namespace App\Http\Controllers;

use App\Models\Abono;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class AbonoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Abono $abono)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Abono $abono)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Abono $abono)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Abono $abono)
    {
        //
    }

    public function pagar(Abono $abono)
    {
        $abono->marcarComoPagado();

        return back()->with('success', 'Abono pagado correctamente.');
    }


    public function pdf(Abono $abono)
    {

        $abono->load(['socio.club', 'asiento.zona']);

        $ruta = storage_path('app/public/' . $abono->socio->club->imagen);
        $logo = null;

        if (file_exists($ruta)) {
            $tipo = pathinfo($ruta, PATHINFO_EXTENSION);
            $logo = 'data:image/' . $tipo . ';base64,' . base64_encode(file_get_contents($ruta));
        }

        $pdf = Pdf::loadView('abonos.pdf', [
            'abono' => $abono,
            'logo'  => $logo,
        ]);

        return $pdf->stream('abono-' . $abono->id . '.pdf');
    }
}
