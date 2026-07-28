const CHART_WIDTH = 640;
const CHART_HEIGHT = 250;
const PLOT = { left: 52, right: 18, top: 24, bottom: 44 };

const formatValue = (value) => (
  Number.isInteger(value)
    ? value.toLocaleString('en-IN')
    : value.toLocaleString('en-IN', { maximumFractionDigits: 2 })
);

const axisCeiling = (maxValue) => {
  if (maxValue <= 0) return 1;
  const roughStep = (maxValue * 1.08) / 4;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const normalized = roughStep / magnitude;
  const scale = [1, 1.5, 2, 2.5, 3, 4, 5, 7.5, 10].find((candidate) => candidate >= normalized) || 10;
  return scale * magnitude * 4;
};

function VisualTable({ title, columns, rows, compact }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[420px] border-separate border-spacing-0 text-left">
        <caption className="sr-only">{title}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="border-b border-black/10 bg-black/[0.035] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6e6e73] dark:border-white/10 dark:bg-white/[0.06] dark:text-[#a1a1a6]"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`${cell}-${cellIndex}`}
                  className={`border-b border-black/[0.06] px-3 ${compact ? 'py-1.5 text-[11px]' : 'py-2 text-[12px]'} font-medium text-[#1d1d1f] last:text-right dark:border-white/[0.08] dark:text-[#f5f5f7]`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SeriesTable({ visual, compact }) {
  const columns = ['Series', ...visual.labels];
  const rows = visual.series.map((series) => [
    series.name,
    ...series.values.map(formatValue),
  ]);
  return <VisualTable title={`${visual.title} source values`} columns={columns} rows={rows} compact={compact} />;
}

function LineChart({ visual }) {
  const allValues = visual.series.flatMap((series) => series.values);
  const maxValue = Math.max(...allValues);
  const axisMax = axisCeiling(maxValue);
  const plotWidth = CHART_WIDTH - PLOT.left - PLOT.right;
  const plotHeight = CHART_HEIGHT - PLOT.top - PLOT.bottom;
  const x = (index) => (
    visual.labels.length === 1
      ? PLOT.left + plotWidth / 2
      : PLOT.left + (index * plotWidth) / (visual.labels.length - 1)
  );
  const y = (value) => PLOT.top + plotHeight - (value / axisMax) * plotHeight;

  return (
    <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="h-auto w-full" role="img" aria-label={visual.title}>
      {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
        const gridY = PLOT.top + plotHeight * (1 - ratio);
        return (
          <g key={ratio}>
            <line x1={PLOT.left} x2={CHART_WIDTH - PLOT.right} y1={gridY} y2={gridY} stroke="currentColor" className="text-black/10 dark:text-white/10" />
            <text x={PLOT.left - 8} y={gridY + 4} textAnchor="end" className="fill-[#86868b] text-[10px]">
              {formatValue(axisMax * ratio)}
            </text>
          </g>
        );
      })}
      {visual.labels.map((label, index) => (
        <text key={label} x={x(index)} y={CHART_HEIGHT - 14} textAnchor="middle" className="fill-[#86868b] text-[11px] font-medium">
          {label}
        </text>
      ))}
      {visual.series.map((series) => {
        const points = series.values.map((value, index) => `${x(index)},${y(value)}`).join(' ');
        return (
          <g key={series.name}>
            <polyline points={points} fill="none" stroke={series.color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {series.values.map((value, index) => (
              <g key={`${series.name}-${visual.labels[index]}`}>
                <circle cx={x(index)} cy={y(value)} r="6" fill={series.color} stroke="white" strokeWidth="3" />
                <text x={x(index)} y={Math.max(14, y(value) - 11)} textAnchor="middle" className="fill-[#1d1d1f] text-[11px] font-bold dark:fill-white">
                  {formatValue(value)}
                </text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function BarChart({ visual }) {
  const allValues = visual.series.flatMap((series) => series.values);
  const maxValue = Math.max(...allValues);
  const axisMax = axisCeiling(maxValue);
  const plotWidth = CHART_WIDTH - PLOT.left - PLOT.right;
  const plotHeight = CHART_HEIGHT - PLOT.top - PLOT.bottom;
  const groupWidth = plotWidth / visual.labels.length;
  const barWidth = Math.min(42, (groupWidth * 0.72) / visual.series.length);
  const y = (value) => PLOT.top + plotHeight - (value / axisMax) * plotHeight;

  return (
    <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="h-auto w-full" role="img" aria-label={visual.title}>
      {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
        const gridY = PLOT.top + plotHeight * (1 - ratio);
        return (
          <g key={ratio}>
            <line x1={PLOT.left} x2={CHART_WIDTH - PLOT.right} y1={gridY} y2={gridY} stroke="currentColor" className="text-black/10 dark:text-white/10" />
            <text x={PLOT.left - 8} y={gridY + 4} textAnchor="end" className="fill-[#86868b] text-[10px]">
              {formatValue(axisMax * ratio)}
            </text>
          </g>
        );
      })}
      {visual.labels.map((label, labelIndex) => {
        const groupStart = PLOT.left + labelIndex * groupWidth + (groupWidth - barWidth * visual.series.length) / 2;
        return (
          <g key={label}>
            {visual.series.map((series, seriesIndex) => {
              const value = series.values[labelIndex];
              const barY = y(value);
              return (
                <g key={series.name}>
                  <rect
                    x={groupStart + seriesIndex * barWidth}
                    y={barY}
                    width={barWidth - 4}
                    height={PLOT.top + plotHeight - barY}
                    rx="5"
                    fill={series.color}
                  />
                  <text
                    x={groupStart + seriesIndex * barWidth + (barWidth - 4) / 2}
                    y={Math.max(13, barY - 6)}
                    textAnchor="middle"
                    className="fill-[#1d1d1f] text-[9px] font-bold dark:fill-white"
                  >
                    {formatValue(value)}
                  </text>
                </g>
              );
            })}
            <text x={PLOT.left + labelIndex * groupWidth + groupWidth / 2} y={CHART_HEIGHT - 14} textAnchor="middle" className="fill-[#86868b] text-[11px] font-medium">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Legend({ series }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {series.map((item) => (
        <span key={item.name} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#6e6e73] dark:text-[#a1a1a6]">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
          {item.name}
        </span>
      ))}
    </div>
  );
}

function StackedComposition({ visual }) {
  return (
    <div className="space-y-4">
      <div className="flex h-12 w-full overflow-hidden rounded-xl bg-black/5 dark:bg-white/10" aria-label={`${visual.title} composition`}>
        {visual.segments.map((segment) => (
          <div
            key={segment.label}
            className="flex items-center justify-center text-[11px] font-bold text-white"
            style={{ width: `${segment.value}%`, backgroundColor: segment.color }}
            title={`${segment.label}: ${segment.value}%`}
          >
            {segment.value}%
          </div>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {visual.segments.map((segment) => (
          <div key={segment.label} className="rounded-xl border border-black/[0.06] bg-white/70 p-3 text-left dark:border-white/10 dark:bg-white/[0.05]">
            <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold text-[#1d1d1f] dark:text-white">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: segment.color }} />
              {segment.label}
            </div>
            <div className="text-[11px] text-[#6e6e73] dark:text-[#a1a1a6]">{segment.value}% share · {segment.annotation}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReconciliationBridge({ visual }) {
  const items = [visual.start, ...visual.adjustments];
  const maxValue = Math.max(...items.map((item) => Math.abs(item.value)));
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="grid grid-cols-[110px_1fr_58px] items-center gap-3">
          <span className="text-right text-[10px] font-semibold text-[#6e6e73] dark:text-[#a1a1a6]">{item.label}</span>
          <div className="h-5 overflow-hidden rounded-md bg-black/[0.05] dark:bg-white/10">
            <div
              className={`h-full rounded-md ${item.total || index === 0 ? 'bg-[#0066cc]' : item.value < 0 ? 'bg-[#ff3b30]' : 'bg-[#34c759]'}`}
              style={{ width: `${Math.max(3, (Math.abs(item.value) / maxValue) * 100)}%` }}
            />
          </div>
          <span className="text-left text-[11px] font-bold text-[#1d1d1f] dark:text-white">
            {item.value > 0 && !item.total && index > 0 ? '+' : ''}{formatValue(item.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AptitudeDataVisual({ visual, compact = false }) {
  if (!visual) return null;

  return (
    <figure
      className={`w-full rounded-[20px] border border-black/[0.07] bg-white/80 text-left shadow-[0_12px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] ${compact ? 'p-3' : 'p-4 md:p-5'}`}
      aria-label={visual.title}
    >
      <figcaption className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#86868b]">Question exhibit</div>
          <div className="mt-0.5 text-[13px] font-semibold text-[#1d1d1f] dark:text-white">{visual.title}</div>
        </div>
        {visual.unit && <span className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[10px] font-medium text-[#6e6e73] dark:bg-white/10 dark:text-[#a1a1a6]">{visual.unit}</span>}
      </figcaption>

      {visual.type === 'line' && (
        <>
          <Legend series={visual.series} />
          <LineChart visual={visual} />
          <SeriesTable visual={visual} compact />
        </>
      )}
      {visual.type === 'bar' && (
        <>
          <Legend series={visual.series} />
          <BarChart visual={visual} />
          <SeriesTable visual={visual} compact />
        </>
      )}
      {visual.type === 'table' && (
        <VisualTable title={visual.title} columns={visual.columns} rows={visual.rows} compact={compact} />
      )}
      {visual.type === 'stacked' && <StackedComposition visual={visual} />}
      {visual.type === 'bridge' && <ReconciliationBridge visual={visual} />}
    </figure>
  );
}
