<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            background: #f3f4f6;
        }

        .carnet {
            width: 500px;
            border: 3px solid #111827;
            border-radius: 12px;
            padding: 20px;
            margin: 40px auto;
            background: white;
        }

        .header {
            text-align: center;
            margin-bottom: 15px;
        }

        .club {
            font-size: 20px;
            font-weight: bold;
        }

        .temporada {
            font-size: 14px;
            color: #555;
        }

        .linea {
            border-top: 1px solid #ddd;
            margin: 12px 0;
        }

        .fila {
            margin-bottom: 6px;
            font-size: 14px;
        }

        .label {
            font-weight: bold;
            display: inline-block;
            width: 120px;
        }

        .estado {
            margin-top: 10px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
        }

        .pagado {
            color: green;
        }

        .pendiente {
            color: red;
        }

        .footer {
            margin-top: 15px;
            text-align: center;
            font-size: 10px;
            color: #777;
        }
    </style>
</head>

<body>

    <div class="carnet">

        <div class="header">
            <div class="club">{{ $abono->socio->club->nombre }}</div>
            <div class="temporada">Abono temporada {{ $abono->temporada }}</div>
            <div class="header" style="text-align:center; margin-bottom:10px;">

                @if ($logo)
                    <div style="text-align:center; margin-bottom:15px;">
                        <img src="{{ $logo }}" style="height:80px;">
                    </div>
                @endif
            </div>

        </div>

        <div class="linea"></div>

        <div class="fila">
            <span class="label">Socio:</span>
            {{ $abono->socio->nombre }}
        </div>

        <div class="fila">
            <span class="label">Nº socio:</span>
            {{ $abono->socio->numero_socio ?? '—' }}
        </div>

        <div class="fila">
            <span class="label">DNI:</span>
            {{ $abono->socio->dni ?? '—' }}
        </div>

        <div class="fila">
            <span class="label">Zona:</span>
            {{ $abono->asiento->zona->nombre }}
        </div>

        <div class="fila">
            <span class="label">Asiento:</span>
            {{ $abono->asiento->numero }}
        </div>

        <div class="fila">
            <span class="label">Importe:</span>
            {{ number_format($abono->importe, 2) }} €
        </div>

        <div class="estado {{ $abono->pagado ? 'pagado' : 'pendiente' }}">
            {{ $abono->pagado ? 'ABONO PAGADO' : 'PAGO PENDIENTE' }}
        </div>

    </div>

</body>

</html>
