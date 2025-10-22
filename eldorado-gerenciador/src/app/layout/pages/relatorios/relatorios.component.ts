import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgxChartsModule,
  ScaleType,
  Color,
  LegendPosition,
} from '@swimlane/ngx-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-relatorios',
  imports: [CommonModule, NgxChartsModule, FormsModule],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.css',
})
export class RelatoriosComponent implements OnInit {
  private readonly http = inject(HttpClient);

  titulo = 'Relatórios';
  periodo = '';
  granularidade = '';
  geradoEm = '';

  periodoFormatado = '';
  granularidadeLabel = '';
  geradoEmDate: Date | null = null;

  totalContatos = 0;
  ativosContatos = 0;
  inativosContatos = 0;
  novosNoPeriodo = 0;
  deltaAbs = 0;
  deltaPct = 0;
  totalTipos = 0;
  ativosTipos = 0;
  inativosTipos = 0;

  contatosStatusPie: any[] = [];
  tiposStatusPie: any[] = [];
  tiposStacked: any[] = [];
  seriesLine: any[] = [];
  topCrescimento: any[] = [];

  metricaSelecionada: 'valor' | 'novos' | 'delta' = 'valor';
  seriesTemporaisData: any = null;
  showChart = true;

  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  legendPosition: LegendPosition = LegendPosition.Right;

  colorScheme: Color = {
    name: 'brand',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#054A29', '#CBDB2A', '#6C757D'],
  };

  tooltipText(data: any): string {
    if (data.value === 0) {
      return '';
    }
    return `${data.series}: ${data.value}`;
  }

  ngOnInit(): void {
    this.http.get<any>('relatorios/avaliacao.json').subscribe((data) => {
      this.montarDados(data);
    });
  }

  private montarDados(data: any) {
    this.titulo = data?.relatorio?.titulo ?? 'Relatórios';
    this.granularidade = data?.relatorio?.periodo?.granularidade ?? '';
    const de = data?.relatorio?.periodo?.de;
    const ate = data?.relatorio?.periodo?.ate;
    this.periodo = de && ate ? `${de} a ${ate}` : '';
    this.geradoEm = data?.relatorio?.gerado_em ?? '';

    this.periodoFormatado =
      de && ate ? `${this.formatBrDate(de)} a ${this.formatBrDate(ate)}` : '';
    this.granularidadeLabel = this.mapGranularidade(this.granularidade);
    this.geradoEmDate = this.geradoEm ? new Date(this.geradoEm) : null;

    this.totalContatos = data?.totais?.contatos?.total ?? 0;
    this.ativosContatos = data?.totais?.contatos?.ativos ?? 0;
    this.inativosContatos = data?.totais?.contatos?.inativos ?? 0;
    this.novosNoPeriodo = data?.totais?.contatos?.novos_no_periodo ?? 0;
    this.deltaAbs =
      data?.totais?.contatos?.delta_vs_periodo_anterior?.absoluto ?? 0;
    this.deltaPct =
      data?.totais?.contatos?.delta_vs_periodo_anterior?.percentual ?? 0;
    this.totalTipos = data?.totais?.tipos?.total ?? 0;
    this.ativosTipos = data?.totais?.tipos?.ativos ?? 0;
    this.inativosTipos = data?.totais?.tipos?.inativos ?? 0;

    this.contatosStatusPie = (data?.quebras?.contatos_por_status || []).map(
      (s: any) => ({
        name: this.capitalize(s.status),
        value: s.quantidade,
      })
    );

    this.tiposStatusPie = (data?.quebras?.tipos_por_status || []).map(
      (s: any) => ({
        name: this.capitalize(s.status),
        value: s.quantidade,
      })
    );

    this.tiposStacked = (data?.quebras?.contatos_por_tipo || []).map(
      (t: any) => ({
        name: t.titulo_tipo,
        series: [
          { name: 'Ativos', value: t.ativos },
          { name: 'Inativos', value: t.inativos },
        ],
      })
    );

    const s = data?.series_temporais?.series || [];
    this.seriesTemporaisData = s;
    this.atualizarGraficoLinha();

    this.topCrescimento = (data?.top?.tipos_por_crescimento || []).map(
      (t: any) => ({
        name: t.titulo_tipo,
        value: t.crescimento_no_periodo,
      })
    );
  }

  atualizarGraficoLinha(): void {
    const s = this.seriesTemporaisData || [];
    const toSeries = (key: string, label: string) => {
      const serie = s.find((x: any) => x.chave === key);
      return {
        name: label,
        series: (serie?.pontos || [])
          .map((p: any) => ({
            name: p.mes,
            value: p[this.metricaSelecionada] ?? 0,
          }))
          .filter((point: any) => point.value !== 0),
      };
    };

    this.showChart = false;
    setTimeout(() => {
      this.seriesLine = [
        toSeries('total', 'Total'),
        toSeries('ativos', 'Ativos'),
        toSeries('inativos', 'Inativos'),
      ];
      this.showChart = true;
    }, 0);
  }

  onMetricaChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.metricaSelecionada = select.value as 'valor' | 'novos' | 'delta';
    this.atualizarGraficoLinha();
  }

  private capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  }

  private formatBrDate(input: string | Date) {
    if (typeof input === 'string') {
      const m = input.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (m) {
        const [, y, mo, d] = m;
        return `${d}/${mo}/${y}`;
      }
    }
    try {
      return formatDate(input, 'dd/MM/yyyy', 'pt-BR');
    } catch {
      return String(input ?? '');
    }
  }

  private mapGranularidade(g: string) {
    const map: Record<string, string> = {
      mes: 'Mês',
      dia: 'Dia',
      ano: 'Ano',
      semana: 'Semana',
    };
    const key = (g || '').toLowerCase();
    return map[key] ?? this.capitalize(g);
  }
}
